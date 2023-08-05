import * as fs from 'fs';

import { Robot } from "../models/robot_model";
import {RobotTask} from "../models/robot_task_model";
import axios, {AxiosError} from 'axios'
import { GetRobotListResponse, GetRobotInfoResponse, RototRunResponse } from "./response";
import { AppException } from "./exception";



export async function get_robot_list(base_url: string, api_key:string): Promise<[Robot[], AxiosError | null]> {
    const url = base_url + "/v2/robots"
    try{
        const response = await axios.get<GetRobotListResponse>(
            url, 
            { 
                headers: { 
                    Accept: "application/json",
                    Authorization: `Bearer ${api_key}`, 
                }
            },
        );
        
        return [response.data.robots.items, null];
    }catch (error){
        let err = error as AxiosError
        return [[], err];
    }
}

export async function get_robot_detail(base_url: string, api_key:string, robot_id: string): Promise<[Robot | null, AxiosError | null]> {
    const url = base_url + "/v2/robots/" + robot_id
    try{
        const response = await axios.get<GetRobotInfoResponse>(
            url, 
            { 
                headers: { 
                    Accept: "application/json",
                    Authorization: `Bearer ${api_key}`, 
                }
            },
        );
        
        return [response.data.robot, null];
    }catch (error){
        let err = error as AxiosError
        return [null, err];
    }
}

export async function robot_run_from_file(base_url: string, api_key:string, robot: Robot, robot_id: string, use_default_parameters: boolean, parameters_file_address: string) : Promise<[RobotTask | null, AppException | null]>{
    let inputParametersData = null;
    try{
        if(!use_default_parameters){
            const parameters_str = fs.readFileSync(parameters_file_address, 'utf-8');

            let parameters = JSON.parse(parameters_str);

            let validate_result = validate_input_parameters(robot, parameters);

            if(validate_result[1] != null) {
                let exp = new AppException(400, "validation of input parameters was failed: " + validate_result[1].message, validate_result[1]);
                throw exp;
            }

            inputParametersData = validate_result[0];
        }
    }
    catch(error){
        let app_ex = new AppException(400, String(error), null);
        return [null, app_ex]
    }

    return await robot_run(base_url, api_key, robot, robot_id, use_default_parameters, inputParametersData, false);
}

export async function robot_run(base_url: string, api_key:string, robot: Robot, robot_id: string, use_default_parameters: boolean, inputParametersData: {} | null, need_validate_params: boolean = true) : Promise<[RobotTask | null, AppException | null]>{
    try{
        if(use_default_parameters){
            inputParametersData = null;
        } else {
            if(need_validate_params && inputParametersData){

                let validate_result = validate_input_parameters(robot, inputParametersData);

                if(validate_result[1] != null) {
                    let exp = new AppException(400, "validation of input parameters was failed: " + validate_result[1].message, validate_result[1]);
                    throw exp;
                }

                inputParametersData = validate_result[0];
            }
        }

        const url = base_url + "/v2/robots/" + robot_id + "/tasks"

        let data = {
            recordVideo: false,
            inputParameters: inputParametersData,
        }

        const response = await axios.post<RototRunResponse>(
            url,
            data,
            { 
                headers: { 
                    Accept: "application/json",
                    Authorization: `Bearer ${api_key}`, 
                }, 
                
            },
        );
        
        return [response.data.result, null];
    }
    catch(error){
        let err = error as AxiosError
        return [null, new AppException(err.response?.status??400, err.message, err)];
    }
}

export function validate_input_parameters(robot: Robot, inputData: object | {}): [{} | null, AppException | null] {
    try{
        if(robot == null){
            throw "ROBOT information not found!";
        }

        if(robot.inputParameters == null || robot.inputParameters.length == 0){
            return [inputData, null]
        }

        let returned_result: { [Name: string]: number | string | boolean | object | object[] } = {};
        for(let index in robot.inputParameters){
            let rule = robot.inputParameters[index];

            if(rule.type == "number" && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)){

                if(rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;

                let currentValue = inputData[rule.name as keyof typeof inputData];

                if(typeof(currentValue) != "number")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof(currentValue)}"`;
                
                if(rule.min && rule.min > currentValue)
                    throw `field "${rule.label} (${rule.name})" should be greater than or equal to "${rule.min}"`;
                
                if(rule.max && rule.max < currentValue)
                    throw `field "${rule.label} (${rule.name})" should be less than or equal to "${rule.max}"`;
                
                returned_result[rule.name] = currentValue;
            
            } else if(rule.type == "url" && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)){

                if(rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;

                let currentValue = inputData[rule.name as keyof typeof inputData];

                if(typeof(currentValue) != "string")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof(currentValue)}"`;
                
                returned_result[rule.name] = currentValue;
            
            } else if((rule.type == "boolean" || rule.type == "bool") && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)){

                if(rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;

                let currentValue = inputData[rule.name as keyof typeof inputData];

                if(typeof(currentValue) != "boolean")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof(currentValue)}"`;
                
                returned_result[rule.name] = currentValue;
            
            } else if((rule.type == "text" || rule.type == "string") && (rule.required || Object.keys(inputData).indexOf(rule.name) != -1)){

                if(rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;

                let currentValue = inputData[rule.name as keyof typeof inputData];

                if(typeof(currentValue) != "string")
                    throw `field "${rule.label} (${rule.name})" should be number but it is "${typeof(currentValue)}"`;
                
                returned_result[rule.name] = currentValue;

            } else if(rule.required || Object.keys(inputData).indexOf(rule.name) != -1) {
                if(rule.required && Object.keys(inputData).indexOf(rule.name) == -1)
                    throw `field "${rule.label} (${rule.name})" not found!`;

                let currentValue = inputData[rule.name as keyof typeof inputData];

                returned_result[rule.name] = currentValue;
            }

        }

        return [returned_result, null]
    }
    catch(error){
        let err = new AppException(400, String(error), null);
        return [null, err]
    }
}

export function print_robot_list(robots : Robot[]){
    let render_table = [];
    for(let i=0;i<robots.length;i++){
        render_table.push({
            id: robots[i].id,
            name: robots[i].name,
            createdAt: new Date(robots[i].createdAt),
        });
    }
    console.table(render_table);
}

export function print_robot_info(robot: Robot){
    print_robot_list([robot]);

    console.log('The Robot Input Parameters: ')
    console.table(robot.inputParameters);
}
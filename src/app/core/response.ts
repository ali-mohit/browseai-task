import { Robot } from "../models/robot_model"
import { RobotTask } from "../models/robot_task_model"

export type RobotListResponse = {
    totalCount: number,
    items: Robot[]
}

export type GetRobotListResponse = {
    statusCode: number,
    messageCode: string,
    robots: RobotListResponse,
}

export type GetRobotInfoResponse = {
    statusCode: number,
    messageCode: string,
    robot: Robot,
}

export type RototRunResponse = {
    statusCode: number,
    messageCode: string,
    result: RobotTask,
}
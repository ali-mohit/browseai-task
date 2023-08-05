# browseai-task

## For Testing

- npm install jest --save-dev
- npm install ts-jest --save-dev
- npm install @types/jest --save-dev

# TASKS:

- example: node .\dist\app\main.js --help

## TASK: robot_list

- example (getting list of robots): node .\dist\app\main.js robot_list -a f691b2b0-ff27-4a29-b2a6-6e4fc241005a:88038480-a927-45e2-b3a2-428312df9db0

```
main.js [command]

Commands:
  main.js cli         interactive cli
  main.js robot_list  retrieve a list of your robots by api key
  main.js robot_info  retrieve information of a robot by api key and robot id
  main.js robot_run   run a task for specific robot by api key and robot id
  main.js version     returns version of applications
  main.js hello       says hello to world

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

### RESULT
```
Starting to Get Robot List
┌─────────┬────────────────────────────────────────┬────────────────────────────────────┬──────────────────────────┐
│ (index) │                   id                   │                name                │        createdAt         │
├─────────┼────────────────────────────────────────┼────────────────────────────────────┼──────────────────────────┤
│    0    │ '25fdc5e2-335e-41f4-8a75-06091ea9e368' │    'Extract companies from YC'     │ 2023-07-25T00:19:31.989Z │
│    1    │ 'c503273e-4578-4dd1-a9f1-5dcb7862963d' │    'Extract company details YC'    │ 2023-07-25T00:20:51.101Z │
│    2    │ '85e6e3a2-67fd-42fb-96e6-67dea8943f94' │ 'Extract Amazon US search results' │ 2023-07-25T00:23:45.328Z │
└─────────┴────────────────────────────────────────┴────────────────────────────────────┴──────────────────────────┘
```

### robot_list command details
```
run a task for specific robot by api key and robot id

Options:
  --help                    Show help                                  [boolean]
  --version                 Show version number                        [boolean]
  --api_key, -a             BrowseAI API KEY                 [string] [required]
  --robot_id, -i            ROBOT ID                         [string] [required]
  --default_parameters, -d  Making a new job by default parameters
      [string] [required] [choices: "yes", "no", "y", "n", "true", "false", "t",
                                                           "f"] [default: "yes"]
  --parameters, -p          address of task parameters as a json file (exmpale:
                            ./temp.js)                                  [string]
```

## TASK: robot_info

- example (get a specefic robot info): node .\dist\app\main.js robot_info -a f691b2b0-ff27-4a29-b2a6-6e4fc241005a:88038480-a927-45e2-b3a2-428312df9db0 -i 85e6e3a2-67fd-42fb-96e6-67dea8943f94

### RESULT
```
Starting to Get a Robot information
┌─────────┬────────────────────────────────────────┬────────────────────────────────────┬──────────────────────────┐
│ (index) │                   id                   │                name                │        createdAt         │
├─────────┼────────────────────────────────────────┼────────────────────────────────────┼──────────────────────────┤
│    0    │ '85e6e3a2-67fd-42fb-96e6-67dea8943f94' │ 'Extract Amazon US search results' │ 2023-07-25T00:23:45.328Z │
└─────────┴────────────────────────────────────────┴────────────────────────────────────┴──────────────────────────┘
The Robot Input Parameters: 
┌─────────┬──────────────────────┬──────────────────┬─────────┬──────────┬───────────┬────────────────────────────────────────────────┬──────────────┬──────────┬─────────────┬─────┬─────┐
│ (index) │         name         │      label       │ pattern │ required │ encrypted │                  description                   │ defaultValue │   type   │    value    │ max │ min │
├─────────┼──────────────────────┼──────────────────┼─────────┼──────────┼───────────┼────────────────────────────────────────────────┼──────────────┼──────────┼─────────────┼─────┼─────┤
│    0    │   'search_keyword'   │ 'Search Keyword' │  '.+'   │   true   │   false   │ 'Keyword to search on Amazon. Example: Laptop' │ 'iphone 14'  │  'text'  │ 'iphone 14' │     │     │
│    1    │ 'product_list_limit' │  'Max Products'  │         │   true   │   false   │                                                │      10      │ 'number' │     10      │ 200 │  1  │
└─────────┴──────────────────────┴──────────────────┴─────────┴──────────┴───────────┴────────────────────────────────────────────────┴──────────────┴──────────┴─────────────┴─────┴─────┘
```


### robot_info command details
```
retrieve information of a robot by api key and robot id

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --api_key, -a   BrowseAI API KEY                           [string] [required]
  --robot_id, -i  ROBOT ID                                   [string] [required]
```


## TASK: robot_run

- example (run with parameters): node .\dist\app\main.js robot_run -a f691b2b0-ff27-4a29-b2a6-6e4fc241005a:88038480-a927-45e2-b3a2-428312df9db0 -i 85e6e3a2-67fd-42fb-96e6-67dea8943f94 -d no -p ./temp.json
- example (run in default): node .\dist\app\main.js robot_run -a f691b2b0-ff27-4a29-b2a6-6e4fc241005a:88038480-a927-45e2-b3a2-428312df9db0 -i 85e6e3a2-67fd-42fb-96e6-67dea8943f94 -d yes

### RESULT
```
Starting to run a task
┌──────────────────────────┬────────────────┬────────────────────┬────────────────────────────────────────┐
│         (index)          │ search_keyword │ product_list_limit │                 Values                 │
├──────────────────────────┼────────────────┼────────────────────┼────────────────────────────────────────┤
│            id            │                │                    │ '5db1689d-168f-40f3-9af0-927c29e39595' │
│          status          │                │                    │             'in-progress'              │
│        createdAt         │                │                    │             1691217912802              │
│        finishedAt        │                │                    │                  null                  │
│  retriedOriginalTaskId   │                │                    │                  null                  │
│      retriedTaskId       │                │                    │                  null                  │
│     retriedByTaskId      │                │                    │                  null                  │
│        startedAt         │                │                    │                  null                  │
│         robotId          │                │                    │ '85e6e3a2-67fd-42fb-96e6-67dea8943f94' │
│   triedRecordingVideo    │                │                    │                 false                  │
│      robotBulkRunId      │                │                    │                  null                  │
│         runByAPI         │                │                    │                  true                  │
│    runByTaskMonitorId    │                │                    │                  null                  │
│       runByUserId        │                │                    │                  null                  │
│    userFriendlyError     │                │                    │                  null                  │
│     inputParameters      │     'ali'      │         12         │                                        │
│      videoRemovedAt      │                │                    │                  null                  │
│         videoUrl         │                │                    │                  null                  │
│ capturedDataTemporaryUrl │                │                    │                  null                  │
│      capturedTexts       │                │                    │                                        │
│   capturedScreenshots    │                │                    │                                        │
│      capturedLists       │                │                    │                                        │
└──────────────────────────┴────────────────┴────────────────────┴────────────────────────────────────────┘
```

### robot_run command details
```
run a task for specific robot by api key and robot id

Options:
  --help                    Show help                                  [boolean]
  --version                 Show version number                        [boolean]
  --api_key, -a             BrowseAI API KEY                 [string] [required]
  --robot_id, -i            ROBOT ID                         [string] [required]
  --default_parameters, -d  Making a new job by default parameters
      [string] [required] [choices: "yes", "no", "y", "n", "true", "false", "t",
                                                           "f"] [default: "yes"]
  --parameters, -p          address of task parameters as a json file (exmpale:
                            ./temp.js)                                  [string]
```

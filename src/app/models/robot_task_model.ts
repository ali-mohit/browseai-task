
export type RobotTask = {
    id: string,
    robotId: string,
    inputParameters: { [Name: string]: number | string | boolean | object | object[] },
    status: string,
    runByUserId: string | null,
    robotBulkRunId: string | null,
    runByTaskMonitorId: string | null,
    runByAPI: boolean,
    createdAt: number,
    startedAt: number,
    finishedAt: number,
    userFriendlyError: any,
    triedRecordingVideo: boolean,
    videoUrl: string,
    videoRemovedAt: number,
    retriedOriginalTaskId: string,
    retriedByTaskId: string | null,
    capturedDataTemporaryUrl: string,
    capturedTexts: CapturedTexts,
    capturedScreenshots: CapturedScreenshots,
    capturedLists: CapturedLists,
};

export type CapturedTexts = {
    "Product Name": string,
    "Width": string,
    "Pattern Repeat": string,
    "Construction": string,
    "Fiber": string,
    "Color": string | null,
    "Main Image": string
}

export type CapturedScreenshots = {
    "top-ads": CapturedScreenshotsTopAds,
}

export type CapturedScreenshotsTopAds = {
    id: string,
    name: string,
    src: string,
    width: number,
    height: number,
    x: number,
    y: number,
    deviceScaleFactor: number,
    full: string,
    comparedToScreenshotId: string,
    diffImageSrc: string,
    changePercentage: number,
    diffThreshold: number,
    fileRemovedAt: number,
}

export type CapturedLists = {
    companies: CompanyInfo[]
}

export type CompanyInfo = {
    "Position": string,
    name: string,
    location: string,
    description: string,
}
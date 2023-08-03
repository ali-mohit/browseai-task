export function test_ctrl(name: string): number{
    console.log("Hello,", name)

    return 0;
}

function run_app(): number{
    console.log('Hello, World From BrowseAI')
    return 0;
}

if (typeof require !== "undefined" && require.main === module) {
    let return_code = run_app();

    process.exit(return_code)
}

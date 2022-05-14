import httpRequest from "../request/index"

async function getAllTask() {
    return await httpRequest.get("/task/all")
}

async function createTask({start_time, end_time, interval, bullets, url,}) {
    return await httpRequest.post("/task/", {start_time, end_time, interval, bullets, url})
}

async function getUrlInfo({url}) {
    return await httpRequest.post("/task/url/info", {url})
}

async function getTaskDetail({task_id}) {
    return await httpRequest.get(`/task/${task_id}/`)
}

export {
    getAllTask,
    createTask,
    getUrlInfo,
    getTaskDetail,
}


import httpRequest from "../request/index"

async function getLoginQRCodeInfo() {
    return await httpRequest.get("/auth/qrcode/info")
}

async function authLoginToken({oauth_key}) {
    return await httpRequest.post("/auth/token", {oauth_key})
}

async function getCurrentLoginUserInfo() {
    return await httpRequest.get("/auth/me")
}

export {
    getLoginQRCodeInfo,
    authLoginToken,
    getCurrentLoginUserInfo,
}


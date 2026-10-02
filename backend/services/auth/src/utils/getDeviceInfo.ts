import {UAParser} from "ua-parser-js"
import type {Request} from "express";

const normalizeDeviceType = (deviceType?: string): "desktop" | "mobile" | "tablet" | "bot" | "unknown" => {
    if (deviceType === "mobile" || deviceType === "tablet" || deviceType === "desktop" || deviceType === "bot" || deviceType === "unknown") {
        return deviceType;
    }

    return "desktop";
};

const getDeviceInfo = (req: Request) => {
    const userAgent = req.headers["user-agent"] ?? "";
    const result = UAParser(userAgent);
    const deviceType = normalizeDeviceType(result.device.type);

    return {
        userAgent,
        os: result.os.name || "",
        browser: result.browser.name || "",
        browserVersion: result.browser.version || "",
        engine: result.engine.name || "",
        engineVersion: result.engine.version || "",
        deviceType,
        vendor: result.device.vendor || "",
        model: result.device.model || "",
    };
};

export default getDeviceInfo;
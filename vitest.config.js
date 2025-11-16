"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        env: {
            TZ: "UTC",
            NODE_OPTIONS: "--disable-warning=DEP0040",
        },
        projects: [
            "clients/**/vitest.config.{ts,js,mts,mjs}",
            "services/**/vitest.config.{ts,js,mts,mjs}",
        ],
    },
});

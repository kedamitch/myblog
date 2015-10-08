require('fatfei.provider.loader').initialize({
        "Modules": [{
            "name": "logger",
            "implementation": "fatfei.provider.logger",
            "settings": {
                "providers": {
                    "filelogger": {
                        "provider": "./filelogger",
                        "options": {
                            "file": "/home/logs/{{new Date().Format(\"yy-MM-dd\")}}-{{severity}}.txt",
                            "line": "{{new Date().Format(\"yy/MM/dd hh:mm:ss\")}} {{msg}}"
                        }
                    },
                    "consolelogger": {
                        "provider": "./consolelogger",
                        "options": {
                            "line": "{{new Date().Format(\"yy/MM/dd hh:mm:ss\")}} {{msg}}"
                        }
                    }
                },
                "loggers": {
                    "log": ["filelogger", "consolelogger"],
                    "info": ["filelogger", "consolelogger"],
                    "warn": ["filelogger", "consolelogger"],
                    "debug": ["consolelogger"],
                    "error": ["filelogger", "consolelogger"],
                    "fatal": ["filelogger", "consolelogger"]
                }
            }
        }, {
            "name": "routeengine",
            "implementation": "fatfei.provider.routeengine",
            "settings": {
                "registername": "onRegister",
                "defaultPage": "/blog/index.do"
            }
        }, {
            "name": "server",
            "master": true,
            "implementation": "fatfei.server.blog",
            "settings": {
                cpus: require('os').cpus().length,
                rootDirectory: require('path').dirname(module.filename),
                port: 8080
            },
            "ref": ["routeengine"]
        }, {
            "name": "blog",
            "implementation": "fatfei.api.blog",
            "ref": ["dao", "user", "filehandler"]
        }, {
            "name": "user",
            "implementation": "fatfei.api.user",
            "ref": ["dao"]
        }, {
            "name": "filehandler",
            "implementation": "fatfei.common.filehandler",
            "settings": {
                tmplPath: require('path').dirname(module.filename) + '/webapp/tmpl'
            }
        }, {
            "name": "staticSource",
            "implementation": "fatfei.module.staticfile",
            "settings": {
                staticPath: require('path').dirname(module.filename) + '/webapp',
                tmplPath: require('path').dirname(module.filename) + '/webapp/tmpl'
            },
            "ref": ["filehandler"]
        }, {
            "name": "dao",
            "implementation": "fatfei.module.dao",
            "settings": {
                "redis": "host=127.0.0.1;port=6379"
            }
        }, {
            "name": "ueditor",
            "implementation": "fatfei.api.ueditor",
            "settings": {
                "ueditorRoot": require('path').dirname(module.filename) + '/webapp/ueditor/',
                "staticPrefix": "/static/ueditor/"
            }
        }]
    },
    function() {
        require('fatfei.provider.loader').server.run();
    }
);
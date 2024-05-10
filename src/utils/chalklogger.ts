import chalk from 'chalk';

export interface ChalkLogger {
    colors: {
        error: chalk.Chalk;
        success: chalk.Chalk;
        normal: chalk.Chalk
    };
    log(message: string): void;
    error(message: string): void;
    success(message: string): void;
    addColor(name: string, color: chalk.Chalk): void;
}

const chalklogger:ChalkLogger = {
    colors: {
        error: chalk.bold.red,
        success: chalk.bold.bgGreen,
        normal: chalk.bold.white
    },
    log(message) {
        console.log(this.colors.normal(message));
    },
    error: function (message) {
        console.log(this.colors.error(message));
    },
    success: function (message) {
        console.log(this.colors.success(message));
    },
    addColor: function (name, color) {
        this.colors[name] = color;
        this[name] = function (message) {
            console.log(color(message));
        };
    }
};


export default chalklogger;

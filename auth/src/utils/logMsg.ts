import chalk from 'chalk';

const log = console.info;

export const defaultMessages = {
  error: 'Operation failed',
  success: 'Operation successful.',
  warning: 'Operation may require more attention.',
};

export default (color: string, typeOfMsg: string, msg: string) =>
  log(chalk`{${color} [${typeOfMsg.toUpperCase()}]\t${msg}}`);

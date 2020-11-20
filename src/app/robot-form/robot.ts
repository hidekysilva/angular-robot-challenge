import {
  PLACE,
  MOVE,
  LEFT,
  RIGHT,
  REPORT,
  SIMPLE_COMMANDS,
  NORTH,
  SOUTH,
  EAST,
  WEST,
  ORIENTATIONS,
  MIN_POSITION,
  MAX_POSITION,
  INVALID_COMMAND,
} from './constants';

export class Robot {
  x: number;
  y: number;
  cardinality: string;
  hasLanded: boolean;
  reportText: string;
  constructor() {
    this.x = null;
    this.y = null;
    this.cardinality = null;
    this.hasLanded = false;
    this.reportText = '';
  }

  processInput(userInput) {
    const commands = userInput.split(/\r?\n/).filter((cmd) => cmd !== '');
    commands.forEach((cmd) => this.executeCommand(cmd));
  }

  private validateCommand(rawCommand) {
    try {
      if (SIMPLE_COMMANDS.includes(rawCommand)) return { command: rawCommand };
      const splitCmd = rawCommand.split(' ');
      if (splitCmd.length !== 2 || splitCmd[0] !== PLACE) throw INVALID_COMMAND;
      const args = splitCmd[1].split(',');
      if (args.length !== 3) throw INVALID_COMMAND;
      const x = this.validateNumericArgument(args[0]);
      const y = this.validateNumericArgument(args[1]);
      const cardinality = args[2];
      if (!ORIENTATIONS.includes(cardinality)) throw INVALID_COMMAND;
      return { command: PLACE, x, y, cardinality };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private validateNumericArgument(value) {
    const number = parseInt(value, 10);
    if (isNaN(number)) throw INVALID_COMMAND;
    if (number < MIN_POSITION || number > MAX_POSITION) throw INVALID_COMMAND;
    return number;
  }

  private executeCommand(rawCommand) {
    const parameters = this.validateCommand(rawCommand);
    if (!parameters) return;
    this.reportText = '';
    console.info(`Command executed: ${rawCommand}`);
    const { command, x, y, cardinality } = parameters;
    switch (command) {
      case PLACE:
        return this.place({ x, y, face: cardinality });
      case MOVE:
        return this.move();
      case LEFT:
        return this.rotateLeft();
      case RIGHT:
        return this.rotateRight();
      case REPORT:
        return this.report();
      default:
        return;
    }
  }

  private place(data) {
    const { x, y, face } = data;
    this.x = x;
    this.y = y;
    this.cardinality = face;
    this.hasLanded = true;
  }

  private report() {
    if (!this.hasLanded) return;
    this.reportText = `Report: x=${this.x}, y=${this.y}, ${this.cardinality}`;
    console.info(this.reportText);
  }

  private move() {
    if (!this.hasLanded) return;
    switch (this.cardinality) {
      case NORTH:
        if (this.y < MAX_POSITION) this.y += 1;
        return;
      case EAST:
        if (this.x < MAX_POSITION) this.x += 1;
        return;
      case SOUTH:
        if (this.y > MIN_POSITION) this.y -= 1;
        return;
      case WEST:
        if (this.x > MIN_POSITION) this.x -= 1;
        return;
      default:
        return;
    }
  }

  private rotateLeft() {
    if (!this.hasLanded) return;
    switch (this.cardinality) {
      case NORTH:
        this.cardinality = WEST;
        return;
      case EAST:
        this.cardinality = NORTH;
        return;
      case SOUTH:
        this.cardinality = EAST;
        return;
      case WEST:
        this.cardinality = SOUTH;
        return;
      default:
        return;
    }
  }

  private rotateRight() {
    if (!this.hasLanded) return;
    switch (this.cardinality) {
      case NORTH:
        this.cardinality = EAST;
        return;
      case EAST:
        this.cardinality = SOUTH;
        return;
      case SOUTH:
        this.cardinality = WEST;
        return;
      case WEST:
        this.cardinality = NORTH;
        return;
      default:
        return;
    }
  }
}

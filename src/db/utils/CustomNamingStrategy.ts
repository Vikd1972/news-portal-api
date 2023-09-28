/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import * as changeCase from 'change-case';
import pluralize from 'pluralize';

const IS_TABLE_NAME_NOUN_MULTIPLE = false;

const joinTableSeparator = '__';

const toSnakeCase = (str: string): string => {
  return str
    .split(joinTableSeparator)
    .map((i) => changeCase.snakeCase(i))
    .join(joinTableSeparator);
};

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]) {
    return toSnakeCase(customName || propertyName);
  }

  tableName(targetName: string, userSpecifiedName: string | undefined) {
    const withEntityRemoved = targetName.replace(/Entity$/, '');
    const withProperCount = IS_TABLE_NAME_NOUN_MULTIPLE
      ? pluralize(withEntityRemoved)
      : withEntityRemoved;
    return toSnakeCase(withProperCount || userSpecifiedName);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ) {
    return `${firstTableName}${joinTableSeparator}${secondTableName}`;
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return `${tableName}_id`;
  }

  joinColumnName(relationName: string, referencedColumnName: string) {
    return referencedColumnName;
  }
}

export default CustomNamingStrategy;

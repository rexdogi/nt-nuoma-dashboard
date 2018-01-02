import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const styles = theme => ({
    table: {},
    tableRowCell: {
        cursor: 'pointer'
    }
});

const MyTable = (props) => {
    const {
        classes,
        columnData = [],
        rowData = [],
        onRowClicked,
        normalized = false,
    } = props;

    const translationId = 1;
    const columnCells = columnData.map((col, i) => (
        <TableCell
            key={i}
            numeric={col.numeric}
        >
            {col.label}
        </TableCell>
    ));

    const translate = (row, column, translationId) => {
        if(row.hasOwnProperty('translations')) {
            if(row.translations.length !== 0) {
                const translation = row.translations.find(translation => translation.languageId === translationId);
                if(translation && translation.hasOwnProperty(column)) {
                    return translation[column];
                }
            }
        }
            return row[column]
    };

    const rowCells = (row, index) => {
        return columnData.map((col, i) => (
            <TableCell
                className={classes.tableRowCell}
                key={i}
                numeric={col.numeric}
                onClick={() => onRowClicked(row, index)}
            >
                {row[col.id]}
            </TableCell>
        ))
    };

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {columnCells}
                </TableRow>
            </TableHead>
            <TableBody>
                {rowData.map((row, index) => {
                    return (
                        <TableRow key={row.id}>
                            {rowCells(row, index)}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

MyTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyTable);
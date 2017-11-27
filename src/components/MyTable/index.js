import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    table: {

    },
});

const MyTable = (props) => {
    const {classes, columnData = [], rowData = []} = props;

    const columnCells = columnData.map((col, i) => (
        <TableCell
            key={i}
            numeric={col.numeric}>
            {col.label}
        </TableCell>
    ));

    const rowCells = (row) => {
        return columnData.map((col) => (
            <TableCell numeric={col.numeric}>{row[col.id]}</TableCell>
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
                {rowData.map(row => {
                    return (
                        <TableRow key={row.id}>
                            {rowCells(row)}
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
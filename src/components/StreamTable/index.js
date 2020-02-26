import React from 'react'
import {
  Box,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const { formatRedisStreamIdTime } = require('../../utils')

const useStyles = makeStyles({
  table: {
    maxWidth: 360,
  },
})

module.exports = props => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Messages
      </Typography>
      <Grid container spacing={1}>
        <Grid item sm={12}>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell align="right">Client</TableCell>
                  <TableCell align="right">Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {formatRedisStreamIdTime(row.id)}
                    </TableCell>
                    <TableCell align="right">{row.client}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

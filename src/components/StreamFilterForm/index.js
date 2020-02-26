import React from 'react'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const { formatRedisStreamIdMinute } = require('../../utils')

module.exports = props => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Selection
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField
            id="hub-client"
            name="hub-client"
            label="Hub client"
            value={props.client}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="message-type"
            name="message-type"
            label="Message type"
            value={props.type}
          />
        </Grid>
        <Grid item xs={3} style={{ display: 'none' }}>
          <Select
            id="range-type"
            name="range-type"
            label="Range"
            value={props.rangeMins || 5}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={5}>5 mins</MenuItem>
            <MenuItem value={15}>15 mins</MenuItem>
            <MenuItem value={30}>30 mins</MenuItem>
            <MenuItem value={60}>60 mins</MenuItem>
            <MenuItem value={240}>4 hours</MenuItem>
            <MenuItem value={460}>8 hours</MenuItem>
            <MenuItem value={1440}>24 hours</MenuItem>
            <MenuItem value={2880}>48 hours</MenuItem>
            <MenuItem value={4320}>3 days</MenuItem>
            <MenuItem value={10080}>7 days</MenuItem>
            <MenuItem value={43200}>30 days</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="from-id"
            name="from-id"
            label="From ID"
            value={formatRedisStreamIdMinute(props.from)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="to-id"
            name="to-id"
            label="To ID"
            value={formatRedisStreamIdMinute(props.to)}
          />
        </Grid>
        <Grid item xs={3}>
          <Box mt={0}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

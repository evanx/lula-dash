import React from 'react'
import { Grid, Typography } from '@material-ui/core'

module.exports = props => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payload
      </Typography>
      <pre>{JSON.stringify(props.item.payload, null, 2)}</pre>
    </React.Fragment>
  )
}

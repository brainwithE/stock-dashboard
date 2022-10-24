/**
 *
 * NoData
 *
 */
import React, { memo } from 'react';

import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import { Grid, Typography } from '@mui/material';

interface Props {
  isHidden: Boolean;
}

export const NoData = memo((props: Props) => {
  if (props.isHidden) return null;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: '90vh' }}
    >
      <EqualizerRoundedIcon
        sx={{
          fontSize: '15em',
          fill: '#d3d9dd',
          background: '#eff0f6',
          borderRadius: '100%',
          paddingBottom: '1.2rem',
          marginBottom: '1rem',
        }}
      />
      <Typography variant="h4">No Stock Found</Typography>
      <Typography variant="body1">
        Please search stock code to view details
      </Typography>
    </Grid>
  );
});

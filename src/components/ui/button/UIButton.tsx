import React, {FC} from 'react';
import Button from '@mui/material/Button';

interface UiButtonParams {
  text: string,
  onClick: () => void,
  isLoading?: boolean,
  variant?: 'text' | 'outlined' | 'contained',
  loadingText?: string,
  disabled?: boolean,
}

export const UIButton: FC<UiButtonParams> = (props) => {
  const loadingText = props.loadingText || 'Loading...';

  return (
  <Button 
  onClick={props.onClick}
  variant={props.variant} 
  disabled={props.isLoading || !!props.disabled}>
    {props.isLoading ? loadingText : props.text}
  </Button>)
}
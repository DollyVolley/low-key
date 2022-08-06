import React, {FC} from 'react';
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Tooltip } from '@mui/material';


interface UiButtonParams {
    text: string,
}

export const UiCopyButton: FC<UiButtonParams> = (props) => {
    const [isCopied, setIsCopied] = React.useState(false);

    function copyToClipboard() {
        navigator.clipboard.writeText(props.text);
        setIsCopied(true);
        window.setTimeout(() => {
            setIsCopied(false);
        }, 3000)
    }

    function getTooltipText() {
        return isCopied ? 'Copied!' : 'Copy';
    }

  return (
    <Tooltip title={getTooltipText()} placement='top' arrow>
        <ContentCopyIconStyled 
        onClick={copyToClipboard} 
        className={isCopied ? 'copied' : ''}
        />
    </Tooltip>
    )
}

const ContentCopyIconStyled = styled(ContentCopyIcon)`
    cursor: pointer;
    color: black;

    &.copied { 
        cursor: default;
        color: grey;
    }
`
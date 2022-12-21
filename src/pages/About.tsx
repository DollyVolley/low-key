import { UiPageWrapper } from '@/components/ui/page-wrapper/UiPageWrapper';
import { Card, Paper } from '@mui/material';
import React, {FC} from 'react';
import styled from "styled-components";

export const About: FC = () => {

    return (
    <UiPageWrapper> 
        <h1>About</h1>
        <p>
            This is currently a private project to test the IOTA Streams technology. 
            I do not intent to make any profit with it, even the opposite I want to make it open source at some point.</p>
        <p>
            This project is still in it's infant stage, eventhough a lot of effort already flowed into it.
            Every feedback is appreciated and donations are very welcome.
        </p>

        <Card>
            <Paper>iota1qzh8jmmqyv4zyw8yx7y0g3guayqhaeer8skekxc23jurd236k647wfhqu6c</Paper>

            <Paper>smr1qqdx6cu20klj5scg6u2nupydt68rcv078svkuvawhszgsc9lvy79vfnflsu</Paper>
        </Card>

    </UiPageWrapper>
    )
}

import React, { FC } from 'react';
import {App} from "./App";
import {createRoot} from "react-dom/client";
import { RecoilRoot } from 'recoil';

import 'typeface-roboto'


const container = document.getElementById('root')
const root = createRoot(container!)

const RootComponent: FC = () => {
    return (
        <RecoilRoot>
            <App/>
        </RecoilRoot>
    )
}

root.render(<RootComponent/>)

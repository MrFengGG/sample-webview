import React, { Component } from 'react';
import { render } from 'react-dom';
import AppRouter from './router/router'

render(
    <AppRouter/>,
    document.getElementById('root')
);
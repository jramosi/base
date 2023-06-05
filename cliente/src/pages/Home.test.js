import React from 'react';
import {shallow} from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import {screen, render} from '@testing-library/react';
import Home from './Home';

describe('HomeTest',() =>{
    it('must display a title',()=>{
        render(<Home/>)
        expect(screen.queryByText(/Estamos en Home/i)).toBeInTheDocument();
    });
});
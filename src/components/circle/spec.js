/* global test, jest, expect */

import 'jsdom-global/register'; 
import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
Enzyme.configure({ adapter: new Adapter() });

global.mount = Enzyme.mount;
import Circle from './Circle'
import CircleSwatch from './CircleSwatch'
import { Swatch } from '../common'
import * as color from '../../helpers/color'

test('Circle renders correctly', () => {
  const tree = renderer.create(
    <Circle />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Circle onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(color.simpleCheckForValidColor(data)).toBeTruthy()
  })
  const tree = mount(
    <Circle onChange={ changeSpy } />,
  )
  expect(changeSpy).toHaveBeenCalledTimes(0)
  const swatches = tree.find(Swatch)
  swatches.at(0).childAt(0).simulate('click')

  expect(changeSpy).toHaveBeenCalled()
})


test('Circle with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(color.simpleCheckForValidColor(data)).toBeTruthy()
  })
  const tree = mount(
    <Circle onSwatchHover={ hoverSpy } />,
  )
  expect(hoverSpy).toHaveBeenCalledTimes(0)
  const swatches = tree.find(Swatch)
  swatches.at(0).childAt(0).simulate('mouseOver')

  expect(hoverSpy).toHaveBeenCalled()
})

test('Circle renders custom styles correctly', () => {
  const tree = renderer.create(
    <Circle styles={{ default: { card: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})

test('CircleSwatch renders correctly', () => {
  const tree = renderer.create(
    <CircleSwatch />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('CircleSwatch renders with sizing and spacing', () => {
  const tree = renderer.create(
    <CircleSwatch circleSize={ 40 } circleSpacing={ 40 } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

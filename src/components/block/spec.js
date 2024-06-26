/* global test, jest, expect */
import 'jsdom-global/register'; 
import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
Enzyme.configure({ adapter: new Adapter() });
global.mount = Enzyme.mount;

import Block from './Block'
import BlockSwatches from './BlockSwatches'
import { Swatch } from '../common'
import* as color from '../../helpers/color'

test('Block renders correctly', () => {
  const tree = renderer.create(
    <Block />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Block onChange events correctly', () => {
  const changeSpy = jest.fn((data) => {
    expect(color.simpleCheckForValidColor(data)).toBeTruthy()
  })
  const tree = mount(
    <Block onChange={ changeSpy } />,
  )
  expect(changeSpy).toHaveBeenCalledTimes(0)
  const swatches = tree.find(Swatch)
  swatches.at(0).childAt(0).simulate('click')

  expect(changeSpy).toHaveBeenCalled()
})

test('Block with onSwatchHover events correctly', () => {
  const hoverSpy = jest.fn((data) => {
    expect(color.simpleCheckForValidColor(data)).toBeTruthy()
  })
  const tree = mount(
    <Block onSwatchHover={ hoverSpy } />,
  )
  expect(hoverSpy).toHaveBeenCalledTimes(0)
  const swatches = tree.find(Swatch)
  swatches.at(0).childAt(0).simulate('mouseOver')

  expect(hoverSpy).toHaveBeenCalled()
})

test('Block `triangle="hide"`', () => {
  const tree = renderer.create(
    <Block triangle="hide" />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('BlockSwatches renders correctly', () => {
  const tree = renderer.create(
    <BlockSwatches colors={ ['#fff', '#999', '#000'] } />,
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
test('Block renders custom styles correctly', () => {
  const tree = renderer.create(
    <Block styles={{ default: { card: { boxShadow: 'none' } } }} />,
  ).toJSON()
  expect(tree.props.style.boxShadow).toBe('none')
})

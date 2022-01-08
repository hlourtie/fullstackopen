import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../components/Blog'
import Noteform from '../components/Noteform'


describe('test visibility of elements', () => {
  let comp
  const blog = {
    author : 'Sebastian vettel',
    title : 'How i got here',
    url : 'www.fia.Com',
    likes: 0,
    user:{
      id:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsdWVoYW5rIiwiaWQiOiI2MWM5ODkxMjQ3M2NiYjk0N2EwNWNjZmIiLCJpYXQiOjE2NDA2MDE1MTZ9.4Xg2MPWcaB9Z5IVKLJXblagVAttXtNxAD-RO_EVDHmA'

    }
 }

  beforeEach(() => {  comp =  render(
	<Blog blog={blog} token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsdWVoYW5rIiwiaWQiOiI2MWM5ODkxMjQ3M2NiYjk0N2EwNWNjZmIiLCJpYXQiOjE2NDA2MDE1MTZ9.4Xg2MPWcaB9Z5IVKLJXblagVAttXtNxAD-RO_EVDHmA'} />
 )})

 test('Blog is rendered', () => {
  expect(comp.container.querySelector('.testBlogClass')
  ).not.toBe(null)
 })

 test('view button is visible', () => {
  expect(comp.container.querySelector('.viewButton')
  ).toHaveStyle('display : inline-block ')
 })

 test('likes and url are invisible visible', () => {
  expect(comp.container.querySelector('.urlrow')
  ).toHaveStyle('display : none ')
 })
 test('like view button clicked and now likes are visible', () => {
  const viewButton = comp.getByText('view')
  fireEvent.click(viewButton)
  expect(comp.container.querySelector('.urlrow')).toHaveStyle('display: block')
 })

})

test('form testing', () => {
  const mockHandler = jest.fn()

  const compForm = render(
    <Noteform handleCreation={mockHandler} />
  )
  const form = compForm.container.querySelector('form')
  const author = compForm.container.querySelector('#author')
  const title = compForm.container.querySelector('#title')
  const url = compForm.container.querySelector('#url')

  fireEvent.change( author, { target: { value: 'hp lovecraft' } } )
  fireEvent.change( title, { target: { value: 'woke culture' } } )
  fireEvent.change( url, { target: { value: 'so done with this' } } )
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('woke culture' )
  expect(mockHandler.mock.calls[0][0].author).toBe('hp lovecraft' )
  expect(mockHandler.mock.calls[0][0].url).toBe('so done with this' )
})
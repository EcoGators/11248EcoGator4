/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom/extend-expect'
 
 describe('Home', () => {
   it('renders a heading', () => {
     render(<Home />)

     const heading = screen.getByRole('main', {
       title: /The Tide Atlas/i,
     })
 
     expect(heading).toBeInTheDocument()
   }),

   it('renders data buttons', () => {
    render(<Home />)

    const button1 = screen.getByText("HAT")
    const button2 = screen.getByText("MHHW")
    const button3 = screen.getByText("MHW")
    const button4 = screen.getByText("DTL")
    const button5 = screen.getByText("MTL")
    const button6 = screen.getByText("MSL")
    const button7 = screen.getByText("MLW")
    const button8 = screen.getByText("MLLW")
    const button9 = screen.getByText("LAT")

    expect(button1).toBeInTheDocument()
    expect(button2).toBeInTheDocument()
    expect(button3).toBeInTheDocument()
    expect(button4).toBeInTheDocument()
    expect(button5).toBeInTheDocument()
    expect(button6).toBeInTheDocument()
    expect(button7).toBeInTheDocument()
    expect(button8).toBeInTheDocument()
    expect(button9).toBeInTheDocument()
  }),

  it('renders the selected datum', () => {
   render(<Home />)

   const datum = screen.getByRole("heading", {
       name: "Mean Tide Level (6 min)"
   })

   expect(datum).toBeInTheDocument()
 }),

 it('renders the date/time picker heading', () => {
  render(<Home />)

  const pickerHeading = screen.getByRole("heading", {
      name: "Select Date & Time"
  })

  expect(pickerHeading).toBeInTheDocument()
}),

it('renders the bottom nav buttons', () => {
 render(<Home />)

    const map = screen.getByRole("button", {
        name: "Map"
    })
    const reports = screen.getByRole("button", {
        name: "Reports"
    })
    const preferences = screen.getByRole("button", {
        name: "Preferences"
    })

    expect(map).toBeInTheDocument()
    expect(reports).toBeInTheDocument()
    expect(preferences).toBeInTheDocument()
    })
 })
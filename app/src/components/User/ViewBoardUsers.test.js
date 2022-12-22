import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ViewBoardUsers from './ViewBoardUsers';


describe('Board : view Users', () => {
    
    it('Should render without crashing with no data', async () => {
      render(<ViewBoardUsers users={[]}/>)
    })

    it('Should show one user', () => {
        const startState = [{access: 2, id: 1, username: "fguntz"}];
        render(
            <MemoryRouter>
                <ViewBoardUsers users={startState}/>
            </MemoryRouter>
        )
        //screen.debug();
        expect(screen.getByText(startState[0].username).textContent).toBe('fguntz')
    });

})

/* 



test("View Users", () => {

      it('Should change theme', async () => {
      render(<Footer />)
      const nightModeButton = screen.getByRole('button')
      expect(nightModeButton.textContent).toBe('Changer de mode : ☀️')
      fireEvent.click(nightModeButton)
      expect(nightModeButton.textContent).toBe('Changer de mode : 🌙')
    })

  expect(finState).toEqual([{ id: 1, done: true, text: "Buy Milk" }]);
}); */

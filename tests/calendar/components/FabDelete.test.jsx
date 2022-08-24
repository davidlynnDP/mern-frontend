import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

jest.mock( '../../../src/hooks/useCalendarStore' );


describe('Pruebas en <FabDelete />', () => {

    const mockStartDeletingEvent = jest.fn();

    beforeEach( ()=> jest.clearAllMocks() );

    
    test('<FabDelete /> debe de mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });
        
        render( <FabDelete /> );

        const btn = screen.getByLabelText( 'btn-delete' );
        // console.log(btn.classList.toString());
        expect( btn.classList ).toContain( 'btn' );
        expect( btn.classList ).toContain( 'btn-danger' );
        expect( btn.classList ).toContain( 'fab-danger' );
        expect( btn.style.display ).toBe( 'none' );
        
    });

    test('<FabDelete /> debe de mostrar el botón SI hay un evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        
        render( <FabDelete /> );

        const btn = screen.getByLabelText( 'btn-delete' );
        // console.log(btn.classList.toString());
        expect( btn.style.display ).toBe( '' );
        
    });

    test('<FabDelete /> debe de llamar startDeletingEvent() SI hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });
        
        render( <FabDelete /> );

        const btn = screen.getByLabelText( 'btn-delete' );
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalled();
        
        
    });

});
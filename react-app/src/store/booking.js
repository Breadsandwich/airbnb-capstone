const CREATE = 'bookings/CREATE';
const GET_ALL = 'bookings/GET_ALL';
const UPDATE = 'bookings/UPDATE';
const DELETE = 'bookings/DELETE';

const create = booking => ({ type: CREATE, booking });
const getAll = bookings => ({ type: GET_ALL, bookings });
const update = booking => ({ type: UPDATE, booking });
const destroy = bookingId => ({ type: DELETE, bookingId });


export const createBooking = (booking) => async (dispatch) => {
    const response = await fetch(`/api/bookings/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data;
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};


export const getBookings = (bookingId) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${bookingId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getAll(data));
        return data
    }
    return response
}

export const updateBooking = (booking, id) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(booking)
        // body: booking
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(update(data));
        return data;
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};


export const deleteBooking = (bookingId) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(destroy(data));
        return data;
    };
    return response;
};


const bookingReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case CREATE:
            newState = state;
            newState[action.booking.id] = action.booking;
            return newState;
        case GET_ALL:
            newState = {};
            action.bookings['all_my_bookings'].forEach(booking => newState[booking.id] = booking);
            return newState

        case GET_ONE:
            newState = {...state};
            newState[action.booking.id] = action.booking;
        return newState;
        case UPDATE:
            newState = state;
            newState[action.booking.id] = action.booking;
            return newState;
        case DELETE:
            newState = state;
            delete newState[action.bookingId.id];
            return newState
        default:
            return state
    };
};

export default bookingReducer

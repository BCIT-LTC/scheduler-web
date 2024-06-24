import Cookies from 'js-cookie';

// Custom hook to get events for the calendar
// This is used in the calendar container
// Currently, it returns dummy data
const useGetEvents = () => {

    /**
     * Parses event data from the database to match FullCalendar's event object
     * @param {Array} events - Array of event objects from database
     * @returns {Array} - Parsed Event data that matches FullCalendar's event object
     */
    const parseEventsForCalendar = (events) => {
        return events.map((event) => {
            //recurring and non-recurring events are mapped differently
            if (event.series_title) {

                const recurringDays = event.recurrence_days.map((day) => {
                    switch (day) {
                        case 'Monday':
                            return 1;
                        case 'Tuesday':
                            return 2;
                        case 'Wednesday':
                            return 3;
                        case 'Thursday':
                            return 4;
                        case 'Friday':
                            return 5;
                        case 'Saturday':
                            return 6;
                        case 'Sunday':
                            return 0;
                        default:
                            return;
                    }
                });

                const startTime = dayjs(event.start_time).format('HH:mm:ss');
                const endTime = dayjs(event.end_time).format('HH:mm:ss');

                return {
                    title: event.series_title,
                    start: event.start_time,
                    end: event.end_time,
                    startTime: startTime,
                    endTime: endTime,
                    daysOfWeek: recurringDays,
                    startRecur: event.start_date,
                    endRecur: event.end_date,
                    extendedProps: {
                        location_id: event.location_id,
                        room_location: event.room_location,
                        description: event.description,
                        facilitator: event.facilitator,
                        announcement: event.announcement,
                        status: event.status,
                        series_id: event.series_id,
                        created: event.created,
                        last_modified: event.last_modified,
                        recurring: true,
                        unparsedEventData: { ...event },
                    }
                };
            } else {
                return {
                    title: event.summary,
                    start: event.start_time,
                    end: event.end_time,
                    extendedProps: {
                        location_id: event.location_id,
                        room_location: event.room_location,
                        description: event.description,
                        facilitator: event.facilitator,
                        status: event.status,
                        announcement: event.announcement,
                        series_id: event.series_id,
                        created: event.created,
                        last_modified: event.last_modified,
                        recurring: false,
                        unparsedEventData: { ...event },
                    }
                };
            }
        });
    };

    const events =
        function (info, successCallback, failureCallback) {
            let jwtToken = Cookies.get("default_jwt");
            const params = new URLSearchParams({
                start: new Date(info.start).toISOString(),
                end: new Date(info.end).toISOString()
            });

            fetch('api/events?' + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json()
                        .then((data) => {
                            console.log('Events fetched successfully');
                            if (!data || !data.length) {
                                console.log('No events found');
                                successCallback([]);
                                return;
                            }
                            const parsedData = parseEventsForCalendar(data);
                            successCallback(parsedData);
                        })
                        .catch(error => {
                            failureCallback(error);
                            console.error('There has been a problem with fetching Event:', error);
                        });
                });
        };

    return events;
};

export default useGetEvents;
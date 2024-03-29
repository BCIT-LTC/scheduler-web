// Custom hook to get events for the calendar
// This is used in the calendar container
// Currently, it returns dummy data
const useGetEvents = () => {

    const dummyEvents = [
        {
            id: 1,
            summary: 'Open Lab',
            start_time: '2024-03-01T08:30:00',
            end_time: '2024-03-01T11:30:00',
            is_holiday: false,
            location: 'NW4-3086',
            description: 'Open Lab',
            facilitator: 'Jasica Munday',
            status: 'CONFIRMED',
            announcement: 'announcement text',
            series_id: null,
            created: '2024-01-07T09:32:12',
            last_modified: '2024-01-08T08:12:34'
        },
        {
            id: 1,
            series_title: 'Open Lab',
            start_time: '2024-03-01T14:30:00',
            end_time: '2024-03-01T16:30:00',
            start_date: '2024-03-01T14:30:00',
            end_date: '2024-03-11T16:30:00',
            recurrence_frequency_weeks: 1,
            recurrence_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            location: 'NW4-3086',
            description: 'Open Lab Series',
            facilitator: 'Jasica Munday',
            status: 'CONFIRMED',
            created: '2024-01-07T09:32:12',
            last_modified: '2024-01-08T08:12:34'
        }
    ];

    return dummyEvents;

};

export default useGetEvents;

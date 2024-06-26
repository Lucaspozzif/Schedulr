import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase/firebase"

import { getClient } from "../../../controllers/clientController"

import { DayTab } from "./day-tab/day-tab"
import { ServiceTab } from "./service-tab/service-tab"
import { ProfessionalTab } from "./professional-tab/professional-tab"
import { TimeTab } from "./time-tab/time-tab"
import { ConfirmationTab } from "./confirmation-tab/confirmation-tab"
import { ConfirmedTab } from "./confirmed-tab/confirmed-tab"

// Importing clientCache from a JSON file
const clientCache = require('../../../cache/clientCache.json')

// Defining type for a schedule object
export type scheduleType = {
    clientId: string
    selectedDate: string,
    startedAt: number,
    selectedServices: selectedServiceType[]
}

// Defining type for a selected service object
export type selectedServiceType = {
    service: number | null,
    state: number,
    professional: number | null,
    startTime: number | null
}

// Defining type for a schedule tab object
export type scheduleTabType = {
    schedule: scheduleType,
    setSchedule: (schedule: scheduleType) => void,
    setTab: (tab: number) => void
    selectedService?: selectedServiceType
    setSelectedService: (service: selectedServiceType) => void
}


function ScheduleAdd() {
    // Using React state hooks to manage state variables
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string>('error')
    const [tab, setTab] = useState(0)
    const [selectedService, setSelectedService] = useState<selectedServiceType | undefined>(undefined)
    const [scheduleForm, setScheduleForm] = useState<scheduleType>({
        clientId: userId,
        selectedDate: new Date().toLocaleDateString('en-US'),
        startedAt: new Date().getTime(),
        selectedServices: []
    })

    // Using an effect hook to handle authentication state change
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) return navigate('/login'); // If user is not authenticated, navigate to login page
            await getClient(user.uid) // Fetch client data using user ID
            setUserId(user.uid) // Set user ID in state
            if (!clientCache[user.uid]) return navigate('/login'); // If client data is not available, navigate to login page
        });
    }, [navigate]);

    // Checking if scheduleForm's clientId is different from userId and updating scheduleForm if necessary
    if (scheduleForm.clientId !== userId) {
        setScheduleForm({ ...scheduleForm, clientId: userId })
    }

    // Array of tabs to be rendered
    const tabs = [
        <DayTab schedule={scheduleForm} setSchedule={setScheduleForm} setTab={setTab} setSelectedService={setSelectedService} />,
        <ServiceTab schedule={scheduleForm} setSchedule={setScheduleForm} setTab={setTab} setSelectedService={setSelectedService} />,
        <ProfessionalTab schedule={scheduleForm} setSchedule={setScheduleForm} setTab={setTab} selectedService={selectedService} setSelectedService={setSelectedService} />,
        <TimeTab schedule={scheduleForm} setSchedule={setScheduleForm} setTab={setTab} selectedService={selectedService} setSelectedService={setSelectedService} />,
        <ConfirmationTab schedule={scheduleForm} setSchedule={setScheduleForm} setTab={setTab} setSelectedService={setSelectedService} />,
        <ConfirmedTab schedule={scheduleForm} setSchedule={setScheduleForm} setTab={setTab} setSelectedService={setSelectedService} />
    ]

    // Returning the currently active tab
    return (
        <div className="schedule">
            {tabs[tab]}
        </div>
    )
}

export default ScheduleAdd
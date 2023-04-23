import { useState } from "react";
import { serviceType } from "../../../controllers/serviceController"

import './service-button.css'

type serviceButtonType = {
    selected?: boolean,
    expandedselected?: [boolean, boolean, boolean, boolean],
    allowExpand?: boolean,
    service: serviceType,
    onClickButton: () => void,
    onClickExpanded?: [() => void, () => void, () => void, () => void]
}

export function ServiceButton(
    {
        selected,
        expandedselected,
        allowExpand = true,
        service,
        onClickButton,
        onClickExpanded
    }: serviceButtonType
) {
    const [expanded, setExpanded] = useState(false)

    const duration = service.duration
    const lastTrueIndex = duration.lastIndexOf(true);
    const trueDuration = duration.slice(0, lastTrueIndex + 1);

    const stateDurationList = service.stateDurations
    const stateTrueDurationArray = []

    for (let i = 0; i < 4; i++) {
        const stateDuration = stateDurationList[i as keyof typeof service.stateDurations]
        const lastTrueIndex = stateDuration.lastIndexOf(true);
        stateTrueDurationArray.push(stateDuration.slice(0, lastTrueIndex + 1));
    }

    const title = service.name
    const subtitle = service.name

    const rightButtonTitle = service.haveStates ?
        allowExpand ?
            expanded ?
                'Ocultar' :
                'Expandir' :
            'Inexpansível' :
        service.value
    const rightButtonSubtitle = service.haveStates ?
        null :
        `${10 * (trueDuration.length)} min`
    const rightButtonSideText = service.inicial ?
        service.haveStates ?
            null :
            'A partir de' :
        null

    const expandedTitle = [...service.stateNames]
    const expandedRightButtonTitle = [...service.stateValues]
    const expandedRightButtonSubtitle = stateTrueDurationArray.map((stateTrueDuration) => {
        return (`${10 * (stateTrueDuration.length)} min`)
    })
    const expandedRightButtonSideText = service.inicial ? 'A partir de' : null

    return (
        <>
            <div className={`service-button${selected ? '-selected' : ''}`} onClick={onClickButton}>
                <p className={`title${selected ? '-selected' : ''}`}>{title}</p>
                <p className={`subtitle${selected ? '-selected' : ''}`}>{subtitle}</p>
                <p className={`right-button-side-text${selected ? '-selected' : ''}`}>{rightButtonSideText}</p>
                <div className={`right-button${selected ? '-selected' : ''}`} onClick={() => {
                    if (service.haveStates && allowExpand) {
                        setExpanded(!expanded);
                    }
                }}>
                    <p className={`right-button-title${selected ? '-selected' : ''}`}>{rightButtonTitle}</p>
                </div>
                <p className={`right-button-subtitle${selected ? '-selected' : ''}`}>{rightButtonSubtitle}</p>
            </div>
            {
                expanded ?
                    <div className={`expansion`}>
                        {
                            expandedTitle.map((expandedTitleItem) => {
                                const index = expandedTitle.indexOf(expandedTitleItem)
                                console.log(index)
                                return (
                                    <div className={`expanded-button${expandedselected?.[index] ? '-selected' : ''}`} onClick={() => {
                                        if (onClickExpanded)
                                            onClickExpanded[index]()
                                    }}>
                                        <p className={`expanded-title${expandedselected?.[index] ? '-selected' : ''}`}>{expandedTitle[index]}</p>
                                        <p className={`expanded-right-button-side-text${expandedselected?.[index] ? '-selected' : ''}`}>{expandedRightButtonSideText}</p>
                                        <div className={`expanded-right-button${expandedselected?.[index] ? '-selected' : ''}`}>
                                            <p className={`expanded-right-button-title${expandedselected?.[index] ? '-selected' : ''}`}>{expandedRightButtonTitle[index]}</p>
                                        </div>
                                        <p className={`expanded-right-button-subtitle${expandedselected?.[index] ? '-selected' : ''}`}>{expandedRightButtonSubtitle[index]}</p>
                                    </div>
                                )
                            })
                        }
                    </div> :
                    null
            }
        </>
    )

}
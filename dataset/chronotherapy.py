def medication_time(condition):

    circadian_map = {

        "Hypertension":23,
        "Heart Disease":22,
        "Diabetes":4,
        "Asthma":21,
        "Arthritis":6

    }

    return circadian_map.get(condition,8)
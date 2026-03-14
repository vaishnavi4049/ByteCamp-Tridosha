from doctor_guidelines import doctor_schedule

THRESHOLD = 3


def circular_time_diff(t1,t2):

    diff = abs(t1-t2)
    return min(diff,24-diff)



def safety_check(condition,ml_time):

    doctor_time = doctor_schedule.get(condition)

    if doctor_time is None:
        return {
            "status":"NO_DOCTOR_DATA",
            "recommended_time":ml_time
        }

    diff = circular_time_diff(ml_time,doctor_time)

    if diff <= THRESHOLD:

        return {

            "status":"SAFE",
            "ai_time":ml_time,
            "doctor_time":doctor_time,
            "difference":diff,
            "doctor_required":False

        }

    else:

        return {

            "status":"VERIFY_DOCTOR",
            "ai_time":ml_time,
            "doctor_time":doctor_time,
            "difference":diff,
            "doctor_required":True

        }


def confidence_score(diff):

    return round(1 - (diff/12),2)
import { BsSunFill, BsSnow, BsFillCloudRainFill } from 'react-icons/bs';
import { FaSkyatlas } from 'react-icons/fa'

const Icon = (mode: String, theme: String) => {
    let bgColor = '#000'
    if (theme === 'dark') {
        bgColor = '#fff'
    }
    switch (mode) {
        case 'Clear':
            return <FaSkyatlas className="w-full" style={{ transform: 'scale(4)' }} fill={bgColor} />
            break;
        case 'Snow':
            return <BsSnow className="w-full" style={{ transform: 'scale(4)' }} fill={bgColor} />
            break;
        case 'Rain':
            return <BsFillCloudRainFill className="w-full" style={{ transform: 'scale(4)' }} fill={bgColor} />
            break;
        case 'Sun':
            return <BsSunFill className="w-full" style={{ transform: 'scale(4)' }} fill={bgColor} />
            break;
    }
}

export default Icon

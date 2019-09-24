import Valid from './components/Valid';
import Btn from './components/Btn';
import GeneralMessage from './components/GeneralMessage';
import Notifications from './components/Notifications';
import TableJL1805 from './components/TableJL1805/TableJL1805';
import SearchServer from './components/SearchServer';
import Gallery from './components/Gallery';
import ImageCheck from './components/ImageCheck';
import RecordAudio from './components/RecordAudio';
import Comments from './components/Comments';

const getPropertyObject = (object_, property, alternative) => {
	if(property in object_){
		return object_[property];
	}else{
		if(alternative in object_){
			return object_[alternative];
		}
		return "";
	}
};

export {
	Valid,
	Btn,
	GeneralMessage,
	Notifications,
	TableJL1805,
	SearchServer,
	Gallery,
	ImageCheck,
	RecordAudio,
	Comments,
	getPropertyObject
}
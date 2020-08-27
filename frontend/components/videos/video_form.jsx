import React from 'react';

class VideoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.video;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
        this.handleVideoFile = this.handleVideoFile.bind(this);
        this.handleThumbnailFile = this.handleThumbnailFile.bind(this);
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value });
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video[title]', this.state.title);
        formData.append('video[description]', this.state.description);
        if (this.state.videoFile) {
            formData.append('video[video]', this.state.videoFile);
        }
        if (this.state.thumbnailFile) {
            formData.append('video[thumbnail]', this.state.thumbnailFile);
        }
        this.props.createVideo(formData);
    };

    handleTitleInput(e) {
        this.setState({ title: e.currentTarget.value });
    };

    handleDescriptionInput(e) {
        this.setState({ description: e.currentTarget.value });
    };

    handleVideoFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ videoFile: file, videoUrl: fileReader.result });
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    };

    handleThumbnailFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ thumbnailFile: file, thumbnailUrl: fileReader.result });
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    };

    render() {
        return (
            <div className="create-video-form">
                <div className="create-video-form-header">
                    <h1>Upload Video</h1>
                    <i className="fas fa-times" onClick={this.props.closeModal}></i>
                </div>
                <h2>Details</h2>
                <div className="create-video-form-body">
                    <div className="create-video-form-body-left">
                        <input type="file" onChange={this.handleThumbnailFile}/>
                        <input type="file" onChange={this.handleVideoFile}/>
                    </div>
                    <div className="create-video-form-body-left">
                        <input type="text" onChange={this.handleTitleInput} placeholder="Add a title that describes your video"/>
                        <textarea type="text" onChange={this.handleDescriptionInput} placeholder="Tell viewers about your video"/>
                        <input type="submit" onClick={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    };
}

export default VideoForm;

import React from 'react'
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal'


class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => ({options: []}))
    }

    handleDeleteOption = optionToRemove => {
        this.setState(prevState => (
            {
                options: prevState.options.filter(option => optionToRemove !== option)
            }))
    }

    handlePick = () => {
        const randomPick = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomPick]

        this.setState(() => ({
            selectedOption: option
        }))
    }

    handleAddOption = option => {
        if (!option) {
            return 'Enter valid option to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists'
        }

        this.setState(prevState => ({options: prevState.options.concat(option)}))
    }

    handleModalClose = () => {
        this.setState(() => ({
            selectedOption: undefined
        }))
    }

    componentDidMount() {
        if (localStorage.getItem('options')) {
            const optionsJson = localStorage.getItem('options')

            this.setState(() => ({options: JSON.parse(optionsJson)}))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)

            localStorage.setItem('options', json)
        }
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer'

        return (
            <div>
                <Header
                    subtitle={subtitle}
                />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOption={this.handleDeleteOption}
                            handleDeleteOptions={this.handleDeleteOptions}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleModalClose={this.handleModalClose}
                />
            </div>
        )
    }
}

export default IndecisionApp
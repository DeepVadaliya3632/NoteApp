import React, { useState, useEffect } from 'react'

const App = () => {

    const [heading, setHeading] = useState('')
    const [notes, setNotes] = useState('')
    const [tasks, setTasks] = useState([])

    const colors = [
        "bg-red-400/30",
        "bg-blue-400/30",
        "bg-green-400/30",
        "bg-yellow-400/30",
        "bg-purple-400/30",
        "bg-pink-400/30"
    ];

    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes"))
        if (savedNotes) {
            setTasks(savedNotes)
        }
    }, [])

    const submitForm = (e) => {
        e.preventDefault()

        const newNote = {
            title: heading,
            topics: notes,
            color: getRandomColor()
        }

        const updatedTasks = [...tasks, newNote]

        setTasks(updatedTasks)

        localStorage.setItem("notes", JSON.stringify(updatedTasks))

        setHeading('')
        setNotes('')
    }


    return (
        <>
            <section className="flex flex-col md:flex-row items-center justify-center min-h-screen">

                {/* add Task */}
                <div className="w-full h-screen md:w-1/2 flex flex-col gap-10 items-center justify-center bg-green-200 border-r p-6">

                    <div className="flex flex-col gap-5 items-center bg-slate-800/50 p-6 rounded-xl w-full max-w-md">

                        <h1 className="font-bold text-2xl md:text-3xl text-white text-center">
                            Create Your Notes Here
                        </h1>

                        <form
                            className="flex flex-col gap-5 w-full"
                            onSubmit={(e) => submitForm(e)}
                        >
                            <input
                                type="text"
                                className="bg-white/80 px-4 py-2 rounded-md focus:bg-white font-semibold w-full"
                                placeholder="Heading"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                            />

                            <textarea
                                className="bg-white/80 px-4 py-2 rounded-md focus:bg-white font-semibold w-full"
                                placeholder="Description"
                                rows="5"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />

                            <input
                                type="submit"
                                className="transition w-full px-4 py-2 bg-green-600 rounded-xl text-white text-xl md:text-2xl active:scale-95 hover:bg-green-700 cursor-pointer"
                            />
                        </form>

                    </div>
                </div>

                {/* notes */}
                <div className="w-full md:w-1/2 h-screen border-l bg-yellow-500/30 p-6 
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

                    {tasks.map((note, index) => (

                        <div key={index} className="w-60 h-60 bg-white rounded-2xl p-4 shadow-2xl relative flex flex-col">
                            <img
                                src="https://pngimg.com/d/pin_PNG76.png"
                                alt=""
                                className="h-10 absolute left-1/2 -translate-x-1/2 -top-3"
                            />

                            <div className="h-10 w-full flex items-center px-3 text-2xl">
                                {index + 1}.
                            </div>

                            <div className={`w-full min-h-40 rounded-2xl py-2 px-4 ${note.color}`}>

                                <p className="text-xl font-semibold break-words">
                                    {note.title}
                                </p>

                                <p className="break-words">
                                    {note.topics}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>
            </section>
        </>
    )
}

export default App
"use client"
import clsx from 'clsx';
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react';
import { useState } from 'react';

const data = [
    { title: 'First', id: 0, checked: false },
    { title: 'Second', id: 1, checked: false },
    { title: 'Third', id: 2, checked: false },
    { title: 'Fourth', id: 3, checked: false },
];
type recordType = {
    title: string,
    id: number,
    checked: boolean
}
const rightDataInit: recordType[] = []


function Home() {

    const [leftData, setLeftData] = useState<recordType[]>(data)
    const [rightData, setRightData] = useState<recordType[]>(rightDataInit)
    const [newRecord, setNewRecord] = useState('');

    //transfer records to right
    const transferRight = (left_data: recordType[]) => {
        const left: recordType[] = [];
        const right: recordType[] = rightData
        left_data.map((record: recordType) => {
            if (record.checked) {
                record.checked = false
                right.push(record);
            } else {
                left.push(record)
            }
        })

        setLeftData(left);
        setRightData(right);
    }

    //transfer records to left
    const transferLeft = (right_data: recordType[]) => {
        const left: recordType[] = leftData;
        const right: recordType[] = []
        right_data.map((record: recordType) => {
            if (record.checked) {
                record.checked = false
                left.push(record);
            } else {
                right.push(record)
            }
        })
        setLeftData(left);
        setRightData(right);

    }

    //highkigh selected record
    const toggleChecked = (id: number, isLeft: boolean) => {
        const items = isLeft ? [...leftData] : [...rightData];
        const updatedRecords = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        if (isLeft) {
            setLeftData(updatedRecords)
        } else {
            setRightData(updatedRecords);
        }
    };


    const addNewRecord = () => {
        setLeftData([...leftData, { title: newRecord, id: Date.now(), checked: false }]);
        setNewRecord('');

    };

    return (
        <>
            <div className='flex-col w-full h-screen  items-center space-y-4 m-56'>
                <div className='flex w-full h-64 items-center'>
                    <div className='p-2 space-y-2 w-56 border shadow-md  rounded-md'>
                        {leftData.map((record: recordType) => {
                            return (<div onClick={() => toggleChecked(record.id, true)} className={clsx("p-2 cursor-pointer border-gray-200 hover:bg-gray-400", {
                                "bg-black text-white": record.checked,
                            })} >
                                <h1>{record.title}</h1>
                            </div>)
                        })}
                    </div>

                    <div className='flex-col p-2 space-y-2'>
                        <MoveLeftIcon className='p-2 bg-blue-400 w-12 h-12' onClick={() => { transferLeft(rightData) }} />
                        <MoveRightIcon className='p-2 bg-blue-400 w-12 h-12' onClick={() => { transferRight(leftData) }} />
                    </div>
                    <div className='p-2 space-y-2 w-56 border shadow-md rounded-md min-h-60'>
                        {rightData.map((record: recordType) => {
                            return (<div className={clsx('border-gray-200', { 'bg-black text-white': record.checked })} onClick={() => toggleChecked(record.id, false)}>
                                <h1>{record.title}</h1>
                            </div>)
                        })}
                    </div>


                </div>
                <input
                    placeholder="Add new record"
                    value={newRecord}
                    onChange={(e) => setNewRecord(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addNewRecord()}
                />
                <button className='bg-blue-500 text-white p-4 rounded-md' onClick={addNewRecord}>
                    Add Record
                </button>
            </div>
        </>
    )
}

export default Home

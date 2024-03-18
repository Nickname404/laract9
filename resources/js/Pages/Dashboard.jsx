import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        Inertia.post('/news', data).then(response => {
            props.setFlashMessage(response.message);
            setIsNotif(true);
            setTitle('');
            setDescription('');
            setCategory('');
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        // if (!props.mynews) {
        //     Inertia.get('/news').then(response => {
        //         props.setMyNews(response.data);
        //     }).catch(error => {
        //         console.error(error);
        //     });
        // }
        // console.log('propss: ', props);
    }, []);


    return (
        <AuthenticatedLayout
            user={props.auth}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {isNotif && <div className="alert alert-success text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{props.flash.message}</span>
                    </div>}
                    <input type="text" placeholder="Judul" className="input input-bordered" onChange={(e) => setTitle(e.target.value)} />
                    <div className="p-6 text-white"><input type="text" placeholder="Deskripsi" className="input input-bordered" onChange={(description) => setDescription(description.target.value)} /></div>
                    <div className="p-6 text-white"><input type="text" placeholder="Kategori" className=" input input-bordered" onChange={(category) => setCategory(category.target.value)} /></div>
                    <button className="btn btn-outline btn-warning p-2" onClick={() => handleSubmit()}>SUBMIT</button>
                </div>
            </div>
            <div className="p-4">
                {props.mynews ? props.mynews.map((news, i) => {
                    return (
                        <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl" >
                            <div className="card-body">
                                <h2 className="card-title">
                                    {news.title}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>{news.description}</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-inline">{news.category}</div>
                                </div>
                            </div>
                        </div >
                    )
                }) : <p>kamu belum memiliki berita</p>}

            </div>
        </AuthenticatedLayout>
    );
}

import { Head } from '@inertiajs/react';
import React from 'react';
import Navbar from '@/Components/navbar';
import Card from '@/Components/homepage/card';
import Paginator from '@/Components/homepage/paginator';

export default function homepage(props) {
    return (
        <div className='min-h-screen bg-slate-950'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4'>
                <Card news={props.news.data} />
            </div>
            <div className='flex justify-center items-center'>
                <Paginator meta={props.news.meta} />
            </div>
        </div>
    )
}
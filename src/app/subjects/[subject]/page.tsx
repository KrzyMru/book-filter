const Page = async ({ params }: { params: Promise<{ subject: string }>,
}) => {
    const { subject } = await params;

    return (
        <div>
            {subject}
        </div>
    );
}

export default Page;
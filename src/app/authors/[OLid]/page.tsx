const Page = async ({ params }: { params: Promise<{ OLid: string }>,
}) => {
    const { OLid } = await params;

    return (
        <div>
            {OLid}
        </div>
    );
}

export default Page;
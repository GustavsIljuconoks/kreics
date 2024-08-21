export default function ProjectPage() {
    return (
        <div id="content" className="w-full px-8 pt-20 pb-16 md:px-16 xl:px-32">
            <div className="lg:flex w-full">

                <div className="w-full lg:w-5/6 text-center">
                    <div className="project-module w-full bg-black-10 mb-8">
                        {/* <img
                            src={propsData.thumbnail}
                            srcSet={propsData.thumbnail}
                        /> */}
                    </div>

                    <div className="description mb-32 p-6 text-start lg:mb-56 lg:p-0">
                        {/* <h1 className="text-2xl font-bold mb-4">
                            {propsData.eventName}
                        </h1>
                        <p>{propsData.description}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

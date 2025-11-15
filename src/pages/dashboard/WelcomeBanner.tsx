const WelcomeBanner: React.FC<{ name: string }> = ({ name }) => (
    <div className="flex flex-col gap-2 mb-8 mt-5">
        <h1 className="text-text-light-primary text-3xl font-bold tracking-tight">Welcome back, {name}!</h1>
        <p className="text-text-light-secondary text-base font-normal leading-normal">
            Here's your financial overview for today.
        </p>
    </div>
);
export default WelcomeBanner
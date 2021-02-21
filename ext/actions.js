export const createTask = async (args, context) => {
    return context.entities.Task.create({
        data: { description: args.description },
    })
}

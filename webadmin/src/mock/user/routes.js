import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
    let result = {}
    result.code = 0
    result.data = [{
        router: 'root',
        children: [
            {
                router: 'user',
                children: ['userList', 'UserForm']
            },
			{
				router: 'prodect',
				children: ['prodectList', 'prodectDetail', 'prodectCorrect', 'prodectCorrectDetail']
			},
			{
				router: 'collection',
				children: ['collectionDetails', 'refundDetails', 'withdrawalList', 'detailedDetail', 'withdrawalDetail']
			},
			{
				router: 'works',
				children: ['worksTeachers', 'worksTeachersDetail']
			},
			{
				router: 'package',
				children: ['packageList', 'packageForm']
			},
			{
				router: 'admin',
				children: ['userGroup','role', 'rule', 'roleForm', 'ugroupForm', 'ruleForm']
			}
        ]
    }]
    return result
})

var app = angular.module('editorApp', [])
    .controller('EditorController', ['$scope',
        function ($scope) {
            $scope.questions = [];
            $scope.newOptions = [];
            $scope.newOption = '';

            $scope.questionTypes = [
                {
                    name: 'text',
                    _id: 1
                },
                {
                    name: 'paragraph',
                    _id: 2
                },
                {
                    name: 'options',
                    _id: 3
                },
                {
                    name: 'check',
                    _id: 4
                },
                {
                    name: 'date',
                    _id: 5
                },
                {
                    name: 'time',
                    _id: 6
                }
            ];

            $scope.newQuestionType = $scope.questionTypes[0];
            
            $scope.newQuestionTypeId = $scope.newQuestionType._id;

            $scope.addQuestion = function () {
                var index = 0;
                for (var ii = 0; ii < $scope.questionTypes.length; ii++) {
                    if ($scope.questionTypes[ii]._id == $scope.newQuestionTypeId) {
                        index = ii;
                    }
                }
                $scope.questions.push({
                    title: $scope.newQuestionText,
                    help: $scope.newHelpText,
                    is_required: $scope.newIsRequired,
                    type: $scope.questionTypes[index],
                    _id: guid(),
                    index: $scope.questions.length
                });
                var idx = $scope.questions.length-1;
                if($scope.questions[idx].type._id == 3
                  ||$scope.questions[idx].type._id == 4)
                    $scope.questions[idx].options = $scope.newOptions;
                $scope.newQuestionText = '';
                $scope.newHelpText = '';
                console.log($scope.questions);
            };



            $scope.remaining = function () {
                var count = 0;
                angular.forEach($scope.questions, function (question) {
                    count += question.done ? 0 : 1;
                });
                return count;
            };

            $scope.delete = function (question) {
                $scope.questions.splice(question, 1);
                //indexing
                for(var ii = 0; ii < $scope.questions.length;ii++)
                {
                $scope.questions[ii].index = ii;
                }
            }
            
            $scope.addOption = function(){
                console.log($scope);
            $scope.newOptions.push({
            _id : $scope.newOptions.length,
                name : $scope.newOptionName,
                text : $scope.newOption
            });
                //$scope.newOption = '';
            };

            $scope.onNewQuestionTypeChanged = function () {
                $scope.newQuestionTypeId = $scope.newQuestionType._id;
                if($scope.newQuestionTypeId == 3 
                  || $scope.newQuestionTypeId == 4)
                {
                $scope.newOptionName = guid();
                    $scope.newOptions = [];
                }

            }

            $scope.onGenerateJsonClick = function () {
                $scope.jsonresult = JSON.stringify($scope.questions);
            }


  }]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
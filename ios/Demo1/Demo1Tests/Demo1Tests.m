//
//  Demo1Tests.m
//  Demo1Tests
//
//  Created by Timiz Qi on 15/10/21.
//  Copyright © 2015年 Timiz Qi. All rights reserved.
//

#import <XCTest/XCTest.h>

@interface Demo1Tests : XCTestCase

@end

@implementation Demo1Tests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end